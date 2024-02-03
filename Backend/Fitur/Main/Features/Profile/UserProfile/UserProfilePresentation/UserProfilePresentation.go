package userprofilepresentation

import (
	"net/http"

	"github.com/gin-gonic/gin"

	userprofiledata "Backend/Main/Features/Profile/UserProfile/UserProfileData"
	"Backend/core"
	"Backend/models"
)

func UserProfile(c *gin.Context) {

	var responseBody userprofiledata.ResponseUsersProfile

	// Retrieve the session using the initialized store
	session, err := core.SessionStore.Get(c.Request, core.SessionName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve session"})
		return
	}

	// Retrieve user ID from the session
	userID, ok := session.Values["userID"].(string)
	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "User not authenticated"})
		return
	}

	query := `SELECT 
	user.Full_Name, 
	user.Email,
	user.Password,
	user.Phone_Number,
	user.Gender,
	user.Address
	FROM user_data as user
	WHERE user.ID = "` + userID + `" LIMIT 1`
	rows, err := models.DB.ConnPool.QueryContext(c, query)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	for rows.Next() {
		err := rows.Scan(
			&responseBody.FullName,
			&responseBody.Email,
			&responseBody.Password,
			&responseBody.PhoneNumber,
			&responseBody.Gender,
			&responseBody.Address,
		)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		core.StatusParamCodeEndPoint:     http.StatusOK,
		core.StatusParamMessageEndPoint:  http.StatusText(http.StatusOK),
		core.StatusParamResponseEndPoint: responseBody})
}
