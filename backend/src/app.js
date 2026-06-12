const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://gen-ai-skillgap-analyzer-frontend.onrender.com"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

// ← yeh add karo
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://gen-ai-skillgap-analyzer-frontend.onrender.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }
    next();
});

app.use(express.json());
app.use(cookieParser());

export default app;