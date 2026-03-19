export interface FormData {
    role: 'client' | 'coach';
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    gender: string;
    // Champs client 
    weight: string;
    height: string;
    goal: string;
    coachId: string;
    // Champs coach
    speciality: string;
    bio: string;
    hourlyRate: string;
}