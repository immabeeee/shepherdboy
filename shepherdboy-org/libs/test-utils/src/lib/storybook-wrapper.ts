import { componentWrapperDecorator } from '@storybook/angular';

export function addDefaultWrapper() {
  return componentWrapperDecorator(
    (story) =>
      `<shepherdboy-org-storybook-wrapper>${story}</shepherdboy-org-storybook-wrapper>`
  );
}
