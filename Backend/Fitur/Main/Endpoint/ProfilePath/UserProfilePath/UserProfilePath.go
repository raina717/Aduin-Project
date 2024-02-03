package userprofilepath

import (
	userprofiledomains "Backend/Main/Features/Profile/UserProfile/UserProfileDomains"
	userprofilepresentation "Backend/Main/Features/Profile/UserProfile/UserProfilePresentation"

	"github.com/gin-gonic/gin"
)

func UserProfilePath(r *gin.Engine) {
	r.GET(userprofiledomains.APIEndPointUserProfile, userprofilepresentation.UserProfile)
}
