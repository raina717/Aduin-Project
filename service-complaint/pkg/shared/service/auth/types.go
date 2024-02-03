package auth

type PayloadNotification struct {
	Title       string `json:"title"`
	UserID      int    `json:"user_id"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}
