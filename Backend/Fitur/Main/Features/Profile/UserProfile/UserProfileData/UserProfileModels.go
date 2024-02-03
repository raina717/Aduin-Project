package userprofiledata

type ResponseUsersProfile struct {
	FullName    string  `gorm:"type:varchar(191)" json:"full_name"`
	Email       string  `gorm:"type:varchar(191)" json:"email"`
	Password    string  `gorm:"type:varchar(191)" json:"password"`
	PhoneNumber int     `gorm:"type:int(20)" json:"phone_number"`
	Gender      *string `gorm:"type:varchar(191)" json:"gender"`
	Address     *string `gorm:"type:varchar(191)" json:"address"`
}
