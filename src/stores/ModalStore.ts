import { createEvent, createStore } from "effector";

const openModal = createEvent();
const closeModal = createEvent();

const $isModalOpen = createStore<boolean>(false);
$isModalOpen.on(openModal, () => true);
$isModalOpen.on(closeModal, () => false);

export { $isModalOpen, openModal, closeModal };