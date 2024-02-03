// * Icon
import { ReactComponent as ArrowIcon } from "../assets/icon/img_arrowdown.svg";
import { ReactComponent as FileIcon } from "../assets/icon/img_mdifileoutline.svg";
import { ReactComponent as NotifikasiIcon } from "../assets/icon/img_mdibelloutline.svg";
import { ReactComponent as AdminIcon } from "../assets/icon/img_grommeticonsuseradmin_blue_gray_400.svg";
import { ReactComponent as UserIcon } from "../assets/icon/img_antdesignuseroutlined.svg";
import { ReactComponent as LogoutIcon } from "../assets/icon/logout_icon.svg";

const SidebarMenu = [
  {
    title: "Main",
    subMenu: [
      {
        label: "Daftar Aduan",
        path: "/aduan",
        icon: FileIcon,
      },
      {
        label: "Notifikasi",
        path: "/notifikasi",
        icon: NotifikasiIcon,
      },
    ],
  },
  {
    title: "Master Data",
    subMenu: [
      {
        label: "Admin",
        path: "/admin",
        icon: AdminIcon,
        strokeIcon: true,
      },
      {
        label: "Pengguna",
        path: "/pengguna",
        icon: UserIcon,
      },
    ],
  },
  {
    title: "User",
    subMenu: [
      {
        label: "Logout",
        path: "",
        icon: LogoutIcon,
        strokeIcon: true,
      },
    ],
  },
];

const TableData = {
  categories: [
    {
      id: "idTracking",
      label: "id tracking",
      style: {},
    },
    {
      id: "pengguna",
      label: "pengguna",
      style: {
        width: "150px",
      },
    },
    {
      id: "judul",
      label: "judul",
      style: {
        width: "150px",
      },
    },
    {
      id: "lokasi",
      label: "lokasi kejadian",
      style: {
        width: "150px",
      },
    },
    {
      id: "tanggalKejadian",
      label: "tanggal kejadian",
      style: {
        width: "150px",
      },
    },
    {
      id: "tanggalDibuat",
      label: "tanggal dibuat",
      style: {
        width: "150px",
      },
    },
    {
      id: "kategoriAduan",
      label: "kategori aduan",
      style: {
        width: "150px",
      },
    },
    {
      id: "responseTindakan",
      label: "respon tindakan",
      style: {
        width: "150px",
      },
    },
  ],
  data: [
    {
      idTracking: "ID1234567890",
      pengguna: "Andi Nugroho",
      judul: "Banyak Parkir Ojol Sembarangan Di tempat umum",
      lokasi: "Jalan Telkom University Buah Batu",
      tanggalKejadian: "30 Okt 2023",
      tanggalDibuat: "01 Nov 2023, 15:30",
      kategoriAduan: "Pelayanan Administrasi Publik",
      responseTindakan: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      idTracking: "ID1234567890",
      pengguna: "Andi Nugroho",
      judul: "Banyak Parkir Ojol Sembarangan Di tempat umum",
      lokasi: "Jalan Telkom University Buah Batu",
      tanggalKejadian: "30 Okt 2023",
      tanggalDibuat: "01 Nov 2023, 15:30",
      kategoriAduan: "Pelayanan Administrasi Publik",
      responseTindakan: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      idTracking: "ID1234567890",
      pengguna: "Andi Nugroho",
      judul: "Banyak Parkir Ojol Sembarangan Di tempat umum",
      lokasi: "Jalan Telkom University Buah Batu",
      tanggalKejadian: "30 Okt 2023",
      tanggalDibuat: "01 Nov 2023, 15:30",
      kategoriAduan: "Pelayanan Administrasi Publik",
      responseTindakan: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
  ],
};

const TableDataAdmin = {
  categories: [
    {
      id: "nama",
      label: "nama",
      style: {
        width: "20%",
      },
    },
    {
      id: "email",
      label: "email",
      style: {
        width: "20%",
      },
    },
    {
      id: "role",
      label: "role",
      style: {
        width: "10%",
      },
    },
    {
      id: "status",
      label: "status",
      style: {
        width: "100px",
      },
    },
    {
      id: "tanggalDibuat",
      label: "tanggal dibuat",
      style: {
        width: "150px",
      },
    },
    {
      id: "tanggalDiupdate",
      label: "tanggal diupdate",
      style: {
        width: "150px",
      },
    },
    {
      id: "detail",
      label: "detail",
      style: {
        width: "100px",
        textAlign: "center",
      },
    },
  ],
  data: [
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "DPRD KABUPATEN BANDUNG",
      email: "dprdkab.bandung@gmail.com",
      role: "Admin",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "MARCUS HORIZON",
      email: "marcus.horizon@gmail.com",
      role: "Anggota",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "VICTORYA SECRET",
      email: "victorya.secret@gmail.com",
      role: "Anggota",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
  ],
};

const TableDataPengguna = {
  categories: [
    {
      id: "nama",
      label: "nama",
      style: {},
    },
    {
      id: "email",
      label: "email",
    },
    {
      id: "status",
      label: "status",
      style: {
        width: "100px",
      },
    },
    {
      id: "tanggalDibuat",
      label: "tanggal dibuat",
      style: {
        width: "150px",
      },
    },
    {
      id: "tanggalDiupdate",
      label: "tanggal diupdate",
      style: {
        width: "150px",
      },
    },
    {
      id: "detail",
      label: "detail",
      style: {
        width: "100px",
        textAlign: "center",
      },
    },
  ],
  data: [
    {
      nama: "Andre Vijaya",
      email: "andre_vijaya@gmail.com",
      status: "Active",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "Andre Vijaya",
      email: "andre_vijaya@gmail.com",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "Andre Vijaya",
      email: "andre_vijaya@gmail.com",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "Andre Vijaya",
      email: "andre_vijaya@gmail.com",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
    {
      nama: "Andre Vijaya",
      email: "andre_vijaya@gmail.com",
      status: "Inactive",
      tanggalDibuat: "01 Nov 2023, 15:30",
      tanggalDiupdate: "01 Nov 2023, 15:30",
      detail: (
        <button className="outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out">
          <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
        </button>
      ),
    },
  ],
};

const KATEGORI_OPTIONS = [
  {
    id: 1,
    name: "Pelayanan Adminitrasi Publik",
    sector: "Komisi 1 : Bidang Pemerintahan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 2,
    name: "Korupsi dan Penyalahgunaan Kekuasaan",
    sector: "Komisi 1 : Bidang Pemerintahan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 3,
    name: "Transparansi dan Akuntabilitas",
    sector: "Komisi 1 : Bidang Pemerintahan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 4,
    name: "Usaha dan Investasi",
    sector: "Komisi 2 : Bidang Perekonomian",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 5,
    name: "Kesejahteraan Tenaga Kerja",
    sector: "Komisi 2 : Bidang Perekonomian",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 6,
    name: "Pasar dan Konsumen",
    sector: "Komisi 2 : Bidang Perekonomian",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 7,
    name: "Pengelolaan Keuangan Publik",
    sector: "Komisi 3 : Bidang Keuangan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 8,
    name: "Perbankan dan Jasa Keuangan",
    sector: "Komisi 3 : Bidang Keuangan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 9,
    name: "Investasi dan Jasa Keuangan",
    sector: "Komisi 3 : Bidang Keuangan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 10,
    name: "Infrastruktur Publik",
    sector: "Komisi 4 : Bidang Pembangunan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 11,
    name: "Lingkungan dan Konservasi",
    sector: "Komisi 4 : Bidang Pembangunan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 12,
    name: "Pembangunan Wilayah",
    sector: "Komisi 4 : Bidang Pembangunan",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 13,
    name: "Pelayanan Kesehatan",
    sector: "Komisi 5 : Bidang Kesejahteraan Rakyat",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 14,
    name: "Pendidikan dan Keterampilan",
    sector: "Komisi 5 : Bidang Kesejahteraan Rakyat",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
  {
    id: 15,
    name: "Kesejahteraan Sosial",
    sector: "Komisi 5 : Bidang Kesejahteraan Rakyat",
    created_at: "2023-12-15T19:35:46.762Z",
    updated_at: "2023-12-15T19:35:51.141Z",
  },
];

const STATUS_OPTIONS = [
  {
    label: "Open",
    value: "Open",
  },
  {
    label: "Sedang Diproses",
    value: "Dalam Proses",
  },
  {
    label: "Selesai",
    value: "Selesai",
  },
  {
    label: "Ditolak",
    value: "Ditolak",
  },
];

export {
  SidebarMenu,
  TableData,
  TableDataAdmin,
  TableDataPengguna,
  KATEGORI_OPTIONS,
  STATUS_OPTIONS,
};
