import { I18n } from "i18n";
import path from "path";

const i18n = new I18n();
i18n.configure({
  locales: ["en", "sv"],
  directory: path.join(__dirname, "../locales"),
});

export default i18n;
