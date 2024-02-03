package signinpresentation

import (
	"net/http"

	"github.com/gin-gonic/gin"

	signindata "Backend/Main/Features/SignIn/SignInData"
	"Backend/core"
	"Backend/models"
)

func SignIn(c *gin.Context) {
	// Initialize the session store if not already initialized
	if core.SessionStore == nil {
		core.InitSessionStore()
	}

	var requestBody signindata.RequestUsersLogin
	var responseBody signindata.ResponseUsersLogin

	/// Validate Request Bad Request
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	/// Validate Response Bad Request
	if requestBody.Email == "" || requestBody.Password == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": http.StatusText(http.StatusBadRequest)})
		return
	}

	email := requestBody.Email
	password := requestBody.Password

	query := `SELECT 
	user.ID, 
	user.Full_Name, 
	user.Email,
	user.Password,
	user.Phone_Number,
	user.Gender,
	user.Address,
	user.Status
	FROM user_data as user
	WHERE user.Email = "` + email + `" LIMIT 1`
	rows, err := models.DB.ConnPool.QueryContext(c, query)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	for rows.Next() {
		err := rows.Scan(
			&responseBody.Id,
			&responseBody.FullName,
			&responseBody.Email,
			&responseBody.Password,
			&responseBody.PhoneNumber,
			&responseBody.Gender,
			&responseBody.Address,
			&responseBody.Status,
		)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}

	/// Validate Response Bad Request
	if responseBody.Id == "" || responseBody.FullName == "" || responseBody.Email == "" {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "User doesn't exist"})
		return
	} else if responseBody.Password != password {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Wrong password"})
		return
	}

	// Create a new session
	session, err := core.SessionStore.Get(c.Request, core.SessionName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	// Set session values
	session.Values["authenticated"] = true
	session.Values["userID"] = responseBody.Id // Assuming responseBody.Id is the user ID

	// Save the session
	if err := session.Save(c.Request, c.Writer); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		core.StatusParamCodeEndPoint:     http.StatusOK,
		core.StatusParamMessageEndPoint:  http.StatusText(http.StatusOK),
		core.StatusParamResponseEndPoint: responseBody})
}
