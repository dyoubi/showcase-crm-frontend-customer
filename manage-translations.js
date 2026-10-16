/* eslint-disable no-continue */
const fs = require('fs');
const path = require('path');

function parseCSV(content) {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());
  const result = [];

  for (let i = 1; i < lines.length; i += 1) {
    if (!lines[i].trim()) {
      continue;
    }

    // Handle quoted values properly
    const row = lines[i];
    const values = [];
    let inQuotes = false;
    let currentValue = '';

    for (let j = 0; j < row.length; j += 1) {
      const char = row[j];

      if (char === '"') {
        if (inQuotes && row[j + 1] === '"') {
          currentValue += '"';
          j += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
        continue;
      }

      currentValue += char;
    }
    values.push(currentValue.trim());

    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });

    result.push(obj);
  }

  return result;
}

function generateCSV(data, headers) {
  const csvLines = [headers.join(',')];

  data.forEach((row) => {
    const values = headers.map((header) => {
      let value = row[header] || '';

      // Escape quotes and commas if needed
      if (value.includes('"') || value.includes(',') || value.includes('\n')) {
        value = `"${value.replace(/"/g, '""')}"`;
      }

      return value;
    });

    csvLines.push(values.join(','));
  });

  return csvLines.join('\n');
}

function generateMissingTranslationFile() {
  try {
    // Read the English translations JSON file
    const enJsonContent = fs.readFileSync(path.join(__dirname, 'app/lang/extracted/en.json'), 'utf8');
    const enTranslations = JSON.parse(enJsonContent);

    // Read the existing CSV translations file with latin1 encoding
    const csvContent = fs.readFileSync(
      path.join(__dirname, 'translations.csv'),
      'latin1', // Use latin1 encoding to preserve special characters
    );
    const existingTranslations = parseCSV(csvContent);

    // Create a map of existing translations for easy lookup
    const existingTranslationsMap = new Map(existingTranslations.map((row) => [row.key, row]));

    // Get all languages from CSV header except 'key', 'defaultMessage', and 'description'
    const headers = Object.keys(existingTranslations[0]);
    const languages = headers.filter((key) => !['key', 'defaultMessage', 'description'].includes(key));

    // Process all keys from en.json
    const mergedTranslations = Object.entries(enTranslations)
      .filter(([key]) => {
        const existingRow = existingTranslationsMap.get(key);

        // return true if the key does not exist in any of the languages
        if (!existingRow) {
          return true;
        }

        // Check if the key exists in any of the languages
        return languages.some((lang) => !existingRow[lang]);
      })
      .map(([key, value]) => {
        const existingRow = existingTranslationsMap.get(key);
        const newRow = {
          key,
          defaultMessage: value.defaultMessage || '',
          description: value.description || '',
        };

        // Add language translations from existing CSV or empty string if not found
        languages.forEach((lang) => {
          newRow[lang] = existingRow ? existingRow[lang] || '' : '';
        });

        return newRow;
      });

    // Sort by key for consistency
    mergedTranslations.sort((a, b) => a.key.localeCompare(b.key));

    // Report missing translations for each language
    let hasMissingTranslations = false;
    languages.forEach((lang) => {
      const missingTranslations = mergedTranslations.filter((row) => !row[lang]);

      if (missingTranslations.length > 0) {
        hasMissingTranslations = true;
        console.error(`\nMissing translations for ${lang}: ${missingTranslations.length}`);
      }
    });

    if (!hasMissingTranslations) {
      console.log('\nAll translations are complete.');
      return;
    }

    // Get current date in DMY format
    const today = new Date();
    const date = `${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${today.getFullYear()}`;

    // Generate CSV content
    const csvOutput = generateCSV(mergedTranslations, ['key', 'defaultMessage', 'description', ...languages]);

    // Write the new CSV file with latin1 encoding
    const outputFileName = `translations_${date}.csv`;

    fs.writeFileSync(
      path.join(__dirname, outputFileName),
      csvOutput,
      'latin1', // Write with latin1 encoding to preserve special characters
    );

    if (hasMissingTranslations) {
      console.warn(
        '\nWarning: There are missing translations. Please check the generated CSV file. \n' + outputFileName,
      );
      console.warn('\nPlease send update translations.csv file to latest version and try commit again');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error processing translations:', error);
  }
}

function generateENJSONFromTranslationFile() {
  try {
    // Read the CSV translations file with latin1 encoding
    const csvContent = fs.readFileSync(path.join(__dirname, 'translations.csv'), 'latin1');
    const translations = parseCSV(csvContent);

    // Create English translations using defaultMessage
    const enTranslations = {};
    translations.forEach((row) => {
      if (row.key && row.defaultMessage) {
        enTranslations[row.key] = {
          defaultMessage: row.defaultMessage,
        };
        if (row.description) {
          enTranslations[row.key].description = row.description;
        }
      }
    });

    // Write English translations
    const enOutputPath = path.join(__dirname, 'app/lang/extracted/en.json');
    fs.writeFileSync(enOutputPath, JSON.stringify(enTranslations, null, 2), 'utf8');
    console.log(`Created translations file for en: ${enOutputPath}`);
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    process.exit(1);
  }
}
function generateJSONFromTranslationFile() {
  try {
    // Read the CSV translations file with latin1 encoding
    const csvContent = fs.readFileSync(path.join(__dirname, 'translations.csv'), 'latin1');
    const translations = parseCSV(csvContent);

    // Get all languages from CSV header except 'key', 'defaultMessage', and 'description'
    const headers = Object.keys(translations[0]);
    const languages = headers.filter((key) => !['key', 'defaultMessage', 'description'].includes(key));

    // Create a JSON file for each language
    languages.forEach((lang) => {
      const langTranslations = {};

      translations.forEach((row) => {
        if (row.key && row[lang]) {
          langTranslations[row.key] = {
            defaultMessage: row[lang],
          };
          if (row.description) {
            langTranslations[row.key].description = row.description;
          }
        }
      });

      // Only create file if there are translations
      if (Object.keys(langTranslations).length > 0) {
        const outputPath = path.join(__dirname, `app/lang/extracted/${lang}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(langTranslations, null, 2), 'utf8');
        console.log(`Created translations file for ${lang}: ${outputPath}`);
      }
    });

    console.log('\nTranslation JSON files have been generated successfully.');
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    process.exit(1);
  }
}

// CLI command handling
function printUsage() {
  console.log('\nUsage:');
  console.log('node manage-translations.js csv     # to prepare the translations CSV file for translation');
  console.log('node manage-translations.js json   # to convert CSV to JSON files');
  process.exit(1);
}

// Get the command line argument
const command = process.argv[2];

if (!command) {
  console.error('Error: Please specify a command');
  printUsage();
}

switch (command.toLowerCase()) {
  case 'default':
    generateENJSONFromTranslationFile();
    break;
  case 'csv':
    generateMissingTranslationFile();
    break;
  case 'json':
    generateENJSONFromTranslationFile();
    generateJSONFromTranslationFile();
    break;
  default:
    console.error('Error: Unknown command:', command);
    printUsage();
}
