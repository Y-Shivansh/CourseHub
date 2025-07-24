import {
    Code, Briefcase, Palette, Brain, BarChart,
    Megaphone, BookOpen, Camera, Braces, DatabaseBackup, Binary, Users, GraduationCap
} from "lucide-react";

export const getCategoryIcon = (category) => {
    switch (category) {
        case ("Frontend Development"):
            return <Braces size={16} />;
        case ('Backend Development'):
            return <DatabaseBackup size={16} />;
        case ('Full Stack Development'):
            return <Code size={16} />;
        case ('DSA'):
            return <Binary size={16} />;
        case ('JEE/NEET'):
            return <GraduationCap size={16} />;
        case ('Competitive'):
            return <Users size={16} />;
        case ('Photography'):
            return <Camera size={16} />;
        case "Business":
            return <Briefcase size={16} />;
        case "Designing":
            return <Palette size={16} />;
        case "AI/ML":
            return <Brain size={16} />;
        case "Data Analysis":
            return <BarChart size={16} />;
        case "Marketing":
            return <Megaphone size={16} />;
        case "Academic":
            return <BookOpen size={16} />;
        default:
            return null;
    }
};
