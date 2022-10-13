import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { DataService } from 'src/app/shared/data.service';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  selectedFiles !: FileList;
  currentFileUpload !: FileMetaData;
  percentage: number = 0;

  constructor(private fileService: FileService, private fireStorage: AngularFireStorage, private dataService : DataService) { }

  ngOnInit(): void {
  }

}
