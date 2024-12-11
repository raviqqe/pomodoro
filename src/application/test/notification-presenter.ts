import { Mocked, vi } from "vitest";
import { NotificationPresenter } from "../notification-presenter.js";

export const notificationPresenter: Mocked<NotificationPresenter> = {
  presentNotification: vi.fn(),
};
