import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [admin, setAdmin] = useState(null);
    const [heroImage, setHeroImage] = useState('');
    const [loading, setLoading] = useState(true);

    // ================= GET PROFILE =================

    const getProfile = async () => {

        try {

            const res = await API.get(
                "/profile",
                {
                    withCredentials: true
                }
            );
            setAdmin(res.data.admin);
        } catch (error) {

            console.log(error);

            setAdmin(null);

        } finally {

            setLoading(false);
        }
    };

    // ================= GET HERO IMAGE =================
    const fetchHeroImage = async () => {
        try {
            const res = await API.get('/getAllHero');
            if (res.data && res.data.hero) {
                setHeroImage(res.data.hero.profileImage || '');
            }
        } catch (error) {
            console.log("Error fetching hero image for fallback:", error);
        }
    };

    // ================= INITIAL LOAD =================

    useEffect(() => {
        getProfile();
        fetchHeroImage();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                admin,
                setAdmin,
                heroImage,
                setHeroImage,
                fetchHeroImage,
                loading,
                getProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);