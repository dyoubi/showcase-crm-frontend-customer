> Date: 03.01.2021r.

# Forward ref wrapper util

## Status

accepted

## Context

When we used our InputField component without wrapper in standard cases like just calling the component we don't see any problem. It changes when we want to integrate with the form library i.e. react-hook-form as in our case. When used we could spot the warning in the console like this:

```
Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
```

Even when it's only the warning nor the error we decided to do something with it.

If you really love the react docs you could learn something from here: https://reactjs.org/docs/forwarding-refs.html

We have built similar util from the last section of the docs. What does this error mean for us? To long story short it's related to the functional components. The class components don't have such issues. **Functional component donesn't accept `ref` as a standard prop. It tries to section this prop off to component instance which they don't have.** We have to manually map our ref into the right place. That's why we are using the imitate ref prop called `forwardedRef`. Class components, are just adding the next element to the instance without mentioned problems.

By wrapping it like this we gain no warning in the console and the possibility to integrate with the libraries which rally on the `ref` like i.e. `react-hook-form` (which is a standard in company btw).

## Decision

You can check the code of the util in `src/utils/forwardRefWrapper.tsx`. It should be used probably in all components that could be used by form libraries

## Consequences

We have to wrap required components into a bit inconvenient wrappers which could scare younger developers.
