const getLocale = () => {
  try {
    const Intl = JSON.parse(localStorage.getItem('ProblemBankState')).Intl;
    return Intl ? Intl.locale : 'fa';
  } catch {
    return 'fa';
  }
};

export default getLocale;
