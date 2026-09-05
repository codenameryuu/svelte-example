NProgress.configure({
  showSpinner: false,
});

NProgress.inc();

NProgress.start();

window.onload = function () {
  NProgress.done();
};
