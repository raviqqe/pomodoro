import { type Mocked, vi } from "vitest";
import type { NotificationPresenter } from "../notification-presenter.js";

export const notificationPresenter: Mocked<NotificationPresenter> = {
  presentNotification: vi.fn(),
};
