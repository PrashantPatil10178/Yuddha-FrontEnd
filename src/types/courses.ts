export interface Teacher {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string | null;
  imageUrl: string | null;
  tags: string[];
  teacherId: number;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
}

export type CourseResponse = Course[];
