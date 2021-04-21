export default class ShowModal {
  constructor(obj) {
    this.$popup = obj.$popup;
    this.$openBtn = obj.$openBtn;
    this.$closeBtn = obj.$closeBtn;
    this.attrParrentNode = obj.attrParrentNode;
    this.status = false;
    this.animationIn = obj.animationIn;
    this.animationOut = obj.animationOut;
    this.onOpenCompleteCallback = obj.onOpenCompleteCallback || function some() {};
    this.onCloseCompleteCallback = obj.onCloseCompleteCallback || function some() {};

    this.$body = document.querySelector('body');

    this.init();
  }

  get isOpen() {
    return this.status;
  }

  /*  */
  enableButton(btn) {
    const button = btn;
    button.disabled = false;
  }

  disableButton(btn) {
    const button = btn;
    button.disabled = true;
  }

  /*  */
  open() {
    this.onOpenCompleteCallback();
    const onComplete = () => {
      this.enableButton(this.$openBtn);
      this.status = true;
    };
    const onStart = () => this.disableButton(this.$openBtn);

    this.animationIn({ onComplete, onStart }).play();
  }

  close() {
    this.onCloseCompleteCallback();
    console.log('egegegeg');
    const onComplete = () => {
      this.enableButton(this.$openBtn);

      this.status = false;
    };
    const onStart = () => this.disableButton(this.$openBtn);

    this.animationOut({ onComplete, onStart }).play();
  }

  toggle() {
    if (this.status) {
      this.$body.classList.remove('modal-active');
      this.close();
    } else {
      this.$body.classList.add('modal-active');
      this.open();
    }
  }

  setStatus(status) {
    this.status = status;
  }

  listeners() {
    const self = this;
    this.$body.addEventListener('click', ({ target }) => {
      if (target.closest(self.attrParrentNode) != null && !self.$openBtn.disabled) {
        self.toggle();
      }
    });
  }

  init() {
    this.listeners();
  }
}

/*  */
