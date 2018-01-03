import { Controller } from './controller';
import { Model } from './model';
import { QueryInputView, SuggestionView } from './view';

const controller = new Controller(new Model(), new QueryInputView(), new SuggestionView());
controller.run();
