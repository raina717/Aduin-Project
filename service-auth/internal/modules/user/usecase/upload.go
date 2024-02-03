package usecase

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"service-auth/internal/modules/user/domain"
	"service-auth/pkg/helper"
	"service-auth/pkg/shared"

	"github.com/golangid/candi/tracer"
)

func (uc *userUsecaseImpl) Upload(ctx context.Context, req *domain.UploadRequest, file io.Reader) (resp domain.UploadResponse, err error) {
	trace, _ := tracer.StartTraceWithContext(ctx, "UserUsecase:Upload")
	defer trace.Finish()

	dir, err := os.Getwd()
	if err != nil {
		return resp, err
	}

	filename := fmt.Sprintf("%s%s", helper.RandStringBytes(12), filepath.Ext(req.Filename))

	if err := os.MkdirAll(filepath.Join(dir, "storage/profile"), os.ModePerm); err != nil {
		log.Fatal(err)
	}

	uploadPath := filepath.Join("storage/profile", filename)

	fileLocation := filepath.Join(dir, uploadPath)
	targetFile, err := os.OpenFile(fileLocation, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		return resp, err
	}

	defer targetFile.Close()

	if _, err := io.Copy(targetFile, file); err != nil {
		return resp, err
	}

	resp.Path = uploadPath
	resp.URL = fmt.Sprintf("%s/%s", shared.GetEnv().BaseURL, resp.Path)

	return resp, nil
}
