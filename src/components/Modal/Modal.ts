import Block from "../../utils/Block";
import template from "./Modal.template.hbs";

export class Modal extends Block {
    constructor({ title, content, button, ...props }: any) {
        super({ title, content, button });
    }
    render() {
        const handleModal = () => {
            const modalButtons: any =
                document.querySelectorAll(".js-open-modal");
            const overlay: any = document.querySelector(".js-overlay-modal");
            const closeButtons: any =
                document.querySelectorAll(".js-modal-close");

            modalButtons.forEach(function (item: any) {
                item.addEventListener("click", function (e: any) {
                    e.preventDefault();

                    const modalId = this.getAttribute("data-modal"),
                        modalElem: any = document.querySelector(
                            '.modal[data-modal="' + modalId + '"]'
                        );

                    modalElem.classList.add("active");
                    overlay.classList.add("active");
                });

                closeButtons.forEach(function (item: any) {
                    item.addEventListener("click", function () {
                        const parentModal = this.closest(".modal");

                        parentModal.classList.remove("active");
                        overlay.classList.remove("active");
                    });
                });

                document.body.addEventListener(
                    "keyup",
                    function (e) {
                        const key = e.keyCode;
                        const modalActive: any =
                            document.querySelector(".modal.active");
                        const overlay: any = document.querySelector(".overlay");
                        if (key == 27) {
                            modalActive.classList.remove("active");
                            overlay.classList.remove("active");
                        }
                    },
                    false
                );

                overlay.addEventListener("click", function () {
                    const modalActive: any =
                        document.querySelector(".modal.active");
                    modalActive.classList.remove("active");
                    this.classList.remove("active");
                });
            });
        };

        setTimeout(handleModal, 500);
        return this.compile(template, this.props);
    }
}

export default Modal;
