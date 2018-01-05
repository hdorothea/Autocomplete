import Controller from './controller';
import Model from './model';
import { QueryInputView, SuggestionView, SuggestionContainerView } from './view';

const controller = new Controller(
  new Model(),
  new QueryInputView(),
  new SuggestionView(),
  new SuggestionContainerView()
);

controller.run();
