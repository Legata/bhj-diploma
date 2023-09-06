/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector('body');
    const sidebarBtn = document.querySelector('.sidebar-toggle');
    sidebarBtn.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sidebarMenu = document.querySelector('.sidebar-menu');

    sidebarMenu.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.menu-item_login')) {
        App.getModal('login').open()
      }
      if (target.closest('.menu-item_register')) {
        App.getModal('register').open()
      }
      if (target.closest('.menu-item_logout')) {
        let callback = function(err, response)  {
          if (response && response.success) {
            App.setState('init');
          }
        }
        User.logout(callback);
      }
    })
  }
}