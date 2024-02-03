

CREATE TABLE complaint_category (
    id bigint NOT NULL,
    name character varying,
    sector character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    sector_id integer
);


--
-- TOC entry 216 (class 1259 OID 16395)
-- Name: complaint_captegory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE complaint_captegory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 216
-- Name: complaint_captegory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE complaint_captegory_id_seq OWNED BY complaint_category.id;


--
-- TOC entry 217 (class 1259 OID 16396)
-- Name: complaint_comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE complaint_comment (
    id bigint NOT NULL,
    comment text,
    complaint_id bigint,
    user_id bigint,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- TOC entry 218 (class 1259 OID 16401)
-- Name: complaint_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE complaint_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 218
-- Name: complaint_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE complaint_comment_id_seq OWNED BY complaint_comment.id;


--
-- TOC entry 219 (class 1259 OID 16402)
-- Name: complaint_evidence; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE complaint_evidence (
    id bigint NOT NULL,
    evidence_type character varying,
    url text,
    complaint_id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- TOC entry 220 (class 1259 OID 16407)
-- Name: complaint_evidence_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE complaint_evidence_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 220
-- Name: complaint_evidence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE complaint_evidence_id_seq OWNED BY complaint_evidence.id;


--
-- TOC entry 221 (class 1259 OID 16408)
-- Name: complaint_like; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE complaint_like (
    id bigint NOT NULL,
    complaint_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- TOC entry 222 (class 1259 OID 16411)
-- Name: complaint_like_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE complaint_like_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 222
-- Name: complaint_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE complaint_like_id_seq OWNED BY complaint_like.id;


--
-- TOC entry 223 (class 1259 OID 16412)
-- Name: complaint_response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE complaint_response (
    id bigint NOT NULL,
    description text,
    complaint_id bigint,
    user_id bigint,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- TOC entry 224 (class 1259 OID 16417)
-- Name: complaint_response_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE complaint_response_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 224
-- Name: complaint_response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE complaint_response_id_seq OWNED BY complaint_response.id;


--
-- TOC entry 225 (class 1259 OID 16418)
-- Name: complaints; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE complaints (
    id bigint NOT NULL,
    complain_no character varying NOT NULL,
    title character varying,
    description text,
    location character varying,
    date timestamp without time zone,
    is_anonymous boolean,
    category_id bigint,
    user_id bigint,
    status character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    share_count integer,
    like_count integer
);


--
-- TOC entry 226 (class 1259 OID 16423)
-- Name: complaints_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE complaints_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3455 (class 0 OID 0)
-- Dependencies: 226
-- Name: complaints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE complaints_id_seq OWNED BY complaints.id;


--
-- TOC entry 227 (class 1259 OID 16424)
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE notifications (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying,
    description text,
    icon character varying,
    is_read boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- TOC entry 228 (class 1259 OID 16429)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 228
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE notifications_id_seq OWNED BY notifications.id;


--
-- TOC entry 229 (class 1259 OID 16430)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE roles (
    id bigint NOT NULL,
    role_name character varying NOT NULL
);


--
-- TOC entry 230 (class 1259 OID 16435)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE roles_id_seq OWNED BY roles.id;


--
-- TOC entry 234 (class 1259 OID 16564)
-- Name: sector; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE sector (
    id bigint NOT NULL,
    sector_name character varying
);


--
-- TOC entry 233 (class 1259 OID 16563)
-- Name: sector_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE sector_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 233
-- Name: sector_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE sector_id_seq OWNED BY sector.id;


--
-- TOC entry 231 (class 1259 OID 16436)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id bigint NOT NULL,
    fullname character varying,
    email character varying,
    whatsapp_number character varying,
    address character varying,
    photo_url character varying,
    password character varying,
    salt character varying,
    status character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    role_id bigint,
    sector_id integer
);


--
-- TOC entry 232 (class 1259 OID 16441)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 3248 (class 2604 OID 16442)
-- Name: complaint_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_category ALTER COLUMN id SET DEFAULT nextval('complaint_captegory_id_seq'::regclass);


--
-- TOC entry 3249 (class 2604 OID 16443)
-- Name: complaint_comment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_comment ALTER COLUMN id SET DEFAULT nextval('complaint_comment_id_seq'::regclass);


--
-- TOC entry 3250 (class 2604 OID 16444)
-- Name: complaint_evidence id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_evidence ALTER COLUMN id SET DEFAULT nextval('complaint_evidence_id_seq'::regclass);


--
-- TOC entry 3251 (class 2604 OID 16445)
-- Name: complaint_like id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_like ALTER COLUMN id SET DEFAULT nextval('complaint_like_id_seq'::regclass);


--
-- TOC entry 3252 (class 2604 OID 16446)
-- Name: complaint_response id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_response ALTER COLUMN id SET DEFAULT nextval('complaint_response_id_seq'::regclass);


--
-- TOC entry 3253 (class 2604 OID 16447)
-- Name: complaints id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaints ALTER COLUMN id SET DEFAULT nextval('complaints_id_seq'::regclass);


--
-- TOC entry 3254 (class 2604 OID 16448)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY notifications ALTER COLUMN id SET DEFAULT nextval('notifications_id_seq'::regclass);


--
-- TOC entry 3255 (class 2604 OID 16449)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 16567)
-- Name: sector id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY sector ALTER COLUMN id SET DEFAULT nextval('sector_id_seq'::regclass);


--
-- TOC entry 3256 (class 2604 OID 16450)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 3423 (class 0 OID 16390)
-- Dependencies: 215
-- Data for Name: complaint_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY complaint_category (id, name, sector, created_at, updated_at, sector_id) FROM stdin;
1	Pelayanan Adminitrasi Publik	Komisi 1 : Bidang Pemerintahan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	1
2	Korupsi dan Penyalahgunaan Kekuasaan	Komisi 1 : Bidang Pemerintahan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	1
3	Transparansi dan Akuntabilitas	Komisi 1 : Bidang Pemerintahan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	1
4	Usaha dan Investasi	Komisi 2 : Bidang Perekonomian	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	2
5	Kesejahteraan Tenaga Kerja	Komisi 2 : Bidang Perekonomian	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	2
6	Pasar dan Konsumen	Komisi 2 : Bidang Perekonomian	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	2
7	Pengelolaan Keuangan Publik	Komisi 3 : Bidang Keuangan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	3
8	Perbankan dan Jasa Keuangan	Komisi 3 : Bidang Keuangan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	3
9	Investasi dan Jasa Keuangan	Komisi 3 : Bidang Keuangan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	3
10	Infrastruktur Publik	Komisi 4 : Bidang Pembangunan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	4
11	Lingkungan dan Konservasi	Komisi 4 : Bidang Pembangunan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	4
12	Pembangunan Wilayah	Komisi 4 : Bidang Pembangunan	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	4
13	Pelayanan Kesehatan	Komisi 5 : Bidang Kesejahteraan Rakyat	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	5
14	Pendidikan dan Keterampilan	Komisi 5 : Bidang Kesejahteraan Rakyat	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	5
15	Kesejahteraan Sosial	Komisi 5 : Bidang Kesejahteraan Rakyat	2023-12-15 19:35:46.762	2023-12-15 19:35:51.141	5
\.


--
-- TOC entry 3425 (class 0 OID 16396)
-- Dependencies: 217
-- Data for Name: complaint_comment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY complaint_comment (id, comment, complaint_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3427 (class 0 OID 16402)
-- Dependencies: 219
-- Data for Name: complaint_evidence; Type: TABLE DATA; Schema: public; Owner: -
--

COPY complaint_evidence (id, evidence_type, url, complaint_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3429 (class 0 OID 16408)
-- Dependencies: 221
-- Data for Name: complaint_like; Type: TABLE DATA; Schema: public; Owner: -
--

COPY complaint_like (id, complaint_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3431 (class 0 OID 16412)
-- Dependencies: 223
-- Data for Name: complaint_response; Type: TABLE DATA; Schema: public; Owner: -
--

COPY complaint_response (id, description, complaint_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3433 (class 0 OID 16418)
-- Dependencies: 225
-- Data for Name: complaints; Type: TABLE DATA; Schema: public; Owner: -
--

COPY complaints (id, complain_no, title, description, location, date, is_anonymous, category_id, user_id, status, created_at, updated_at, share_count, like_count) FROM stdin;
\.


--
-- TOC entry 3435 (class 0 OID 16424)
-- Dependencies: 227
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY notifications (id, user_id, title, description, icon, is_read, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3437 (class 0 OID 16430)
-- Dependencies: 229
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY roles (id, role_name) FROM stdin;
1	User
2	Super Admin
3	Anggota DPRD
4	Admin DPRD
\.


--
-- TOC entry 3442 (class 0 OID 16564)
-- Dependencies: 234
-- Data for Name: sector; Type: TABLE DATA; Schema: public; Owner: -
--

COPY sector (id, sector_name) FROM stdin;
1	Komisi 1
2	Komisi 2
3	Komisi 3
4	Komisi 4
5	Komisi 5
\.


--
-- TOC entry 3439 (class 0 OID 16436)
-- Dependencies: 231
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY users (id, fullname, email, whatsapp_number, address, photo_url, password, salt, status, created_at, updated_at, role_id, sector_id) FROM stdin;
19	Testing Aduin User	superadmin@aduin.info	0812345678910	Cloud Hosting		bSvZd9MfX3ceLdmbyX0b9JKDsv5w2VujxaWCEOPxo84=	VAIPE6cg0/s=	Active	2023-12-25 22:34:01.450933	2023-12-26 14:49:52.97848	2	0
\.


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 216
-- Name: complaint_captegory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('complaint_captegory_id_seq', 15, true);


--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 218
-- Name: complaint_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('complaint_comment_id_seq', 2, true);


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 220
-- Name: complaint_evidence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('complaint_evidence_id_seq', 6, true);


--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 222
-- Name: complaint_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('complaint_like_id_seq', 12, true);


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 224
-- Name: complaint_response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('complaint_response_id_seq', 13, true);


--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 226
-- Name: complaints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('complaints_id_seq', 6, true);


--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 228
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('notifications_id_seq', 34, true);


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('roles_id_seq', 3, true);


--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 233
-- Name: sector_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('sector_id_seq', 5, true);


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('users_id_seq', 21, true);


--
-- TOC entry 3259 (class 2606 OID 16452)
-- Name: complaint_category complaint_captegory_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_category
    ADD CONSTRAINT complaint_captegory_pk PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 16454)
-- Name: complaint_comment complaint_comment_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_comment
    ADD CONSTRAINT complaint_comment_pk PRIMARY KEY (id);


--
-- TOC entry 3263 (class 2606 OID 16456)
-- Name: complaint_evidence complaint_evidence_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_evidence
    ADD CONSTRAINT complaint_evidence_pk PRIMARY KEY (id);


--
-- TOC entry 3265 (class 2606 OID 16458)
-- Name: complaint_like complaint_like_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_like
    ADD CONSTRAINT complaint_like_pk PRIMARY KEY (id);


--
-- TOC entry 3267 (class 2606 OID 16460)
-- Name: complaint_response complaint_response_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaint_response
    ADD CONSTRAINT complaint_response_pk PRIMARY KEY (id);


--
-- TOC entry 3269 (class 2606 OID 16462)
-- Name: complaints complaints_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaints
    ADD CONSTRAINT complaints_pk PRIMARY KEY (id);


--
-- TOC entry 3271 (class 2606 OID 16555)
-- Name: complaints complaints_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY complaints
    ADD CONSTRAINT complaints_un UNIQUE (complain_no);


--
-- TOC entry 3273 (class 2606 OID 16466)
-- Name: notifications notifications_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_pk PRIMARY KEY (id);


--
-- TOC entry 3275 (class 2606 OID 16468)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (id);


--
-- TOC entry 3279 (class 2606 OID 16571)
-- Name: sector sector_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY sector
    ADD CONSTRAINT sector_pk PRIMARY KEY (id);


--
-- TOC entry 3277 (class 2606 OID 16470)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


-- Completed on 2023-12-29 17:14:33

--
-- PostgreSQL database dump complete
--

