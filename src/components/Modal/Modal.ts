import Block from "../../utils/Block";
import type { Button } from "../Button/Button";
import type { Input } from "../Input/Input";
import template from "./Modal.template.hbs";

interface ModalProps {
    title: string;
    content: Input;
    button: Button;
}

export class Modal extends Block {
    constructor({ title, content, button }: ModalProps) {
        super({ title, content, button });
    }

    render() {
        const handleModal = () => {
            const modalButtons = document.querySelectorAll(".js-open-modal")!;
            const overlay = document.querySelector(".js-overlay-modal")!;
            const closeButtons = document.querySelectorAll(".js-modal-close")!;

            modalButtons.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    e.preventDefault();

                    const modalId = this.getAttribute("data-modal");
                    const modalElem = document.querySelector(
                        `.modal[data-modal="${modalId}"]`
                    )!;

                    modalElem.classList.add("active");
                    overlay.classList.add("active");
                });

                closeButtons.forEach(function (item) {
                    item.addEventListener("click", function () {
                        const parentModal = this.closest(".modal");

                        parentModal.classList.remove("active");
                        overlay.classList.remove("active");
                    });
                });

                document.body.addEventListener(
                    "keyup",
                    function (e) {
                        const key = e.code;
                        const modalActive =
                            document.querySelector(".modal.active")!;
                        const overlay = document.querySelector(".overlay")!;
                        if (key === "Escape") {
                            modalActive.classList.remove("active");
                            overlay.classList.remove("active");
                        }
                    },
                    false
                );

                overlay.addEventListener("click", function () {
                    const modalActive =
                        document.querySelector(".modal.active")!;
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
