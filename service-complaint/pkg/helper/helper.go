package helper

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"strconv"
	"time"

	mathRand "math/rand"
)

var (
	IndonesianDay = []string{"Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"}

	IndonesianMonth = map[time.Month]string{
		time.January:   "Januari",
		time.February:  "Februari",
		time.March:     "Maret",
		time.April:     "April",
		time.May:       "Mei",
		time.June:      "Juni",
		time.July:      "Juli",
		time.August:    "Agustus",
		time.September: "September",
		time.October:   "Oktober",
		time.November:  "November",
		time.December:  "Desember",
	}

	// DateFormatHHmm const
	DateFormatHHmm = "15:04"
)

const (
	letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
)

func GenerateComplaintNumber() string {
	bignum, _ := rand.Int(rand.Reader, big.NewInt(99999999999))
	return fmt.Sprintf("%012d", bignum.Int64())
}

func ToIndonesianDateFormat(d time.Time) string {
	dateTimeIndonesia := fmt.Sprintf("%s %s %s", strconv.Itoa(d.Day()), IndonesianMonth[d.Month()], strconv.Itoa(d.Year()))
	return dateTimeIndonesia
}

func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[mathRand.Intn(len(letterBytes))]
	}

	return string(b)
}
