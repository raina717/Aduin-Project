import { object, string, number } from "yup";

const regVarchar = /^[a-zA-Z0-9 _$#@!()*&^%-]/g;
const regAddress = /[a-zA-Z0-9 ]/g;

export const FormCreateAdminScheme = object().shape({
  fullname: string().required("Nama Lengkap tidak boleh kosong"),
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
  status: string().required("Status tidak boleh kosong"),
  role_id: number().required("Role tidak boleh kosong"),
  sector_id: number().when("role_id", {
    is: (role_id) => {
      if (role_id === 3 || role_id === 2) {
        return true;
      }

      return false;
    },
    then: () => number().notRequired().nullable(),
    otherwise: () => number().required("Komisi tidak boleh kosong"),
  }),
});

export const FormUpdateAdminScheme = object().shape({
  fullname: string().required("Nama Lengkap tidak boleh kosong"),
  whatsapp_number: string().optional(),
  email: string().email("Email tidak valid").optional(),
  address: string()
    .matches(regAddress, {
      message: "Masukkan alamat yang valid",
    })
    .max(150, "Maksimal 150 karakter")
    .optional(),
  status: string().required("Status tidak boleh kosong"),
});

export const FormUpdatePenggunaScheme = object().shape({
  fullname: string().required("Nama Lengkap tidak boleh kosong"),
  status: string().required("Status tidak boleh kosong"),
});
