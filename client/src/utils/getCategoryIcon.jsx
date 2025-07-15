import {
    Code, Briefcase, Palette, Brain, BarChart,
    Megaphone, BookOpen
} from "lucide-react";

export const getCategoryIcon = (category) => {
    switch (category) {
        case "Development":
            return <Code size={16} />;
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
