import { createI18n } from 'vue-i18n'
import session from '@/service/session/session';
// import { localeMessages } from './messages';
import eng from './eng/eng';

const message = {
    english: eng,
    // filipino: localeMessages('filipino'),
    // korean: localeMessages('korean'),
    // spanish: localeMessages('spanish'),
    // chinese: localeMessages('chinese')
};

export default createI18n({
    locale: (session.get('locale') || 'english'),
    fallbackLocale: 'english',
    messages: message
})