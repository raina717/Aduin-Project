package domain

// RequestNotification model
type RequestNotification struct {
	Title       string `json:"title"`
	UserID      int    `json:"user_id"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

type RequestPutNotification struct {
	NotifIds []int `json:"notif_ids"`
	UserID   int   `json:"user_id"`
	IsRead   bool  `json:"is_read"`
}
