export interface PetResponse {
    // id: number;
    petName: string;
    petBirthDate: string; // LocalDate → string
    petGender: 'MALE' | 'FEMALE'; // enum
    petWeight: number;
    petBreed: string; // PetBreed.name
    petProfileImageUrl: string;
}

export interface MemberResponse {
    id: number;
    name: string;
    userName: string;
    email: string;
    phone: string;
    createdAt: string;
    role: string;
    isEnabled: boolean;

    pets: PetResponse[];
    countTipLike: number;
    countQuestion: number;
}
