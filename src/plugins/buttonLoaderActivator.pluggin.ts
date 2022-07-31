import type { App } from "vue";

export default {
  install: (app: App) => {
    const disableButton = (id: string) => {
      const element: HTMLInputElement = document.getElementById(
        id
      ) as HTMLInputElement;
      if (element !== null) element.disabled = true;
    };

    app.provide("disableButton", disableButton);

    const enableButton = (id: string) => {
      const element: HTMLInputElement = document.getElementById(
        id
      ) as HTMLInputElement;
      if (element !== null) element.disabled = false;
    };

    app.provide("enableButton", enableButton);
  },
};
