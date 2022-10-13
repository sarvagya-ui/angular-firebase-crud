import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //add student - create
  addStudent(student: Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  //get all students - read
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  //deleteStudent
  deleteStudent(student: Student) {
    this.afs.doc('/Students/' + student.id).delete();
  }

  //update
  updateStudent(student: Student) {
    this.deleteStudent(student);
    this.addStudent(student);
  }
}
