-- Contact form submissions.
-- Every accepted message is stored here first, so nothing is lost while email
-- forwarding is being configured. `delivered` records whether the message was
-- also handed to the email provider.
CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  delivered INTEGER NOT NULL DEFAULT 0,
  delivery_note TEXT
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at
  ON contact_messages (created_at DESC);
