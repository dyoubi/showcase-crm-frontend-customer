declare namespace sg {
  export function launch(
    options: GameLaunchOptions,
    onError: (gameDispatcher: any) => void,
    onSuccess: (error: string) => void,
  );
}

interface GameLaunchOptions {
  target_element: string;
  launch_options: {
    game_url: string;
    strategy: GameLaunchStrategy;
  };
}

type GameLaunchStrategy =
  | 'redirect'
  | 'iframe'
  | 'detect'
  | 'detect_device'
  | 'netent'
  | 'playngo'
  | 'egt'
  | 'gaming1'
  | 'elk';
