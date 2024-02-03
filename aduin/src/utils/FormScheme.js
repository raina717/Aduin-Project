import { object, string, number, date, boolean } from "yup";
import moment from "moment";

const regNum = /^[0-9]/g;
const regFirstZero = /\b08+|[a-zA-Z]+/g;

const regVarchar = /^[a-zA-Z0-9 _$#@!()*&^%-]/g;
const regAddress = /[a-zA-Z0-9 ]/g;

export const FormLoginScheme = object().shape({
  email: string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  password: string().required("Password tidak boleh kosong"),
});

export const FormForgetPasswordScheme = object().shape({
  email: string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
});

export const FormChangePasswordScheme = object().shape({
  password: string()
    .min(8, "Panjang password minimal 8 huruf")
    .matches(regVarchar, {
      message: "Karakter yang diizinkan hanya Charnum dan _$#@!()*&^%-",
    })
    .required("Password tidak boleh kosong"),
  confirm_password: string().test(
    "passwords-match",
    "Konfirmasi Password tidak sama",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export const FormRegisterScheme = object().shape({
  fullname: string().required("Nama Lengkap tidak boleh kosong"),
  whatsapp_number: string()
    .min(8, "Minimum 8 angka")
    .max(14, "Nomor anda tidak valid")
    .matches(regFirstZero, { message: "Harus diawali dengan 08" })
    .matches(regNum, { message: "Hanya boleh angka" })
    .optional(),
  email: string()
    .email("Email tidak valid")
    .required("Email tidak boleh kosong"),
  password: string()
    .min(8, "Panjang password minimal 8 huruf")
    .matches(regVarchar, {
      message: "Karakter yang diizinkan hanya Charnum dan _$#@!()*&^%-",
    })
    .required("Password tidak boleh kosong"),
  confirm_password: string().test(
    "passwords-match",
    "Konfirmasi Password tidak sama",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export const FormCreateComplaintScheme = object().shape({
  title: string().required("Judul Aduan tidak boleh kosong"),
  description: string().required("Deskripsi Aduan tidak boleh kosong"),
  location: string().required("Lokasi Kejadian tidak boleh kosong"),
  date: date()
    .max(
      moment().add(1, "day").toDate(),
      "Tanggal Kejadian tidak boleh lebih dari hari ini"
    )
    .required("Tanggal Kejadian tidak boleh kosong"),
  category_id: number().required("Kategori Aduan tidak boleh kosong"),
  is_anonymous: boolean().optional(),
});

export const FormEditProfileScheme = object().shape({
  fullname: string().required("Nama Lengkap tidak boleh kosong"),
  whatsapp_number: string()
    .min(8, "Minimum 8 angka")
    .max(14, "Nomor anda tidak valid")
    .matches(regFirstZero, { message: "Harus diawali dengan 08" })
    .matches(regNum, { message: "Hanya boleh angka" })
    .required("Nomor Whatsapp tidak boleh kosong"),
  email: string().email("Email tidak valid").optional(),
  address: string()
    .matches(regAddress, {
      message: "Masukkan alamat yang valid",
    })
    .max(150, "Maksimal 150 karakter")
    .optional(),
});
