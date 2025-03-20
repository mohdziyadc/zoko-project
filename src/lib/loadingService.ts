let setLoadingCallback: (isLoading: boolean) => void = () => {};

export const registerLoadingCallback = (
  callback: (isLoading: boolean) => void
) => {
  setLoadingCallback = callback;
};

export const setLoading = (isLoading: boolean) => {
  setLoadingCallback(isLoading);
};
