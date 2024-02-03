package usecase

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"service-complaint/internal/modules/complaint/domain"
	"service-complaint/pkg/helper"
	"service-complaint/pkg/shared"

	"github.com/golangid/candi/tracer"
)

func (uc *complaintUsecaseImpl) Upload(ctx context.Context, req *domain.UploadRequest, file io.Reader) (resp domain.UploadResponse, err error) {
	trace, _ := tracer.StartTraceWithContext(ctx, "ComplaintUsecase:Upload")
	defer trace.Finish()

	dir, err := os.Getwd()
	if err != nil {
		return resp, err
	}

	if err := os.MkdirAll(filepath.Join(dir, fmt.Sprintf("storage/evidences/%d", req.ComplaintID)), os.ModePerm); err != nil {
		log.Fatal(err)
	}

	req.Filename = fmt.Sprintf("%s%s", helper.RandStringBytes(12), filepath.Ext(req.Filename))

	uploadPath := filepath.Join(fmt.Sprintf("storage/evidences/%d", req.ComplaintID), req.Filename)

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
