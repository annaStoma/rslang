import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VOCABULARIES } from './vocabularies';
import { ApiService } from '../../shared/services/api.service';
import { Word } from '../../shared/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AggregatedFilter } from '../../shared/types';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

  currVocabulary: string;
  words: Array<Word>;
  displayedColumns: string[] = ['word', 'wordTranslate', 'transcription', 'textMeaning', 'textMeaningTranslate', 'Restore'];
  dataSource: MatTableDataSource<Word>;
  isSpinnerVisible: boolean = false;
  title: string;
  isDisable: boolean = true;
  isStudied: boolean = true;
  filter: AggregatedFilter;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.currVocabulary = params.voc;
        this.loadVocabulary(VOCABULARIES[this.currVocabulary]);
      });
  }

  restoreWord(word: Word): void {
    this.dataSource.data.splice(this.words.indexOf(word), 1);
    this.dataSource = new MatTableDataSource<Word>(this.dataSource.data);
    this.apiService.deleteUserWordByWordId(word._id).subscribe(data => data);
  }

  chooseGroup(group: number): void {
    this.loadVocabulary(VOCABULARIES[this.currVocabulary], group);
    this.isStudied = true;
  }

  loadVocabulary(vocabulary: any, group?: number) {
    this.title = `${ this.currVocabulary } words`;
    switch (vocabulary) {
      case 1:
        this.isSpinnerVisible = true;
        this.isStudied = false;
        this.isDisable = false;
        this.apiService.getUserAggregatedWords(null, 600, group).subscribe(data => {
          this.dataSource = new MatTableDataSource(data[0].paginatedResults);
          this.words = data[0].paginatedResults;
          this.dataSource.paginator = this.paginator;
          this.isSpinnerVisible = false;
        });
        break;
      case 2:
        this.filter = {$and: [{'userWord.difficulty': 'hard', 'userWord.optional.hard': true}]};
        this.isSpinnerVisible = true;
        this.apiService.getUserAggregatedWords(this.filter)
          .subscribe(data => {
          this.dataSource = new MatTableDataSource(data[0].paginatedResults);
          this.words = data[0].paginatedResults;
          this.dataSource.paginator = this.paginator;
          this.isSpinnerVisible = false;
        });
        break;
      case 3:
        this.filter = {$and: [{'userWord.difficulty': 'easy', 'userWord.optional.deleted': true}]};
        this.isSpinnerVisible = true;
        this.apiService.getUserAggregatedWords(this.filter)
          .subscribe(data => {
          this.dataSource = new MatTableDataSource(data[0].paginatedResults);
          this.words = data[0].paginatedResults;
          this.dataSource.paginator = this.paginator;
          this.isSpinnerVisible = false;
        });
        break;
    }
  }
}


