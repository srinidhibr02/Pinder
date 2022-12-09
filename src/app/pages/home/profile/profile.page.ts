import { Component, OnInit } from '@angular/core';
import { Post, Pet, PetType, CatBreed, DogBreed } from '../../../models/pet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  selectedPetName: any;
  selectedPet: any;

  post1: Post = {
    image: '../../../../assets/PetProfile/Tuffy/IMG_6833.JPG',
    likes: ['petId2', 'petId3', 'petId5', 'petId8']
  };
  post2:Post = {
    image:'../../../../assets/PetProfile/Tuffy/IMG_6836.JPG',
    likes:['petId2', 'petId3','petId8']
  };
  post3:Post = {
    image:'../../../../assets/PetProfile/Tuffy/IMG_6838.JPG',
    likes:['petId2', 'petId3', 'petId5', 'petId6','petId8']
  };
  post4: Post = {
    image:'../../../../assets/PetProfile/Tuffy/IMG_6842.JPG',
    likes:['petId2', 'petId3', 'petId5', 'petId6','petId8', 'petId9']
  }
  pets: any = [
    {
      petId: 1,
      name: 'Tuffy',
      category: 'DOG',
      breed: 'Labrador',
      temparament: ['Friendly', 'Playful'],
      dp: '../../../../assets/PetProfile/Tuffy/IMG_6842.JPG',
      posts: [this.post1,this.post2, this.post3, this.post4],
      followers: ['petId2', 'petId3'],
      following: ['petId2', 'petId4', 'petId5', 'petId6']
    },
    {
      petId: 2,
      name: 'Tobi',
      category: 'DOG',
      breed: 'Labrador',
      temparament: ['Affectionate', 'Excited'],
      dp: 'dpsrc2',
      posts: ['src5', 'src6', 'src7'],
      followers: ['petId1'],
      following: ['petId4', 'petId7', 'petId53', 'petId9', 'petId5']
    },
    {
      petId: 3,
      name: 'Kimi',
      category: 'CAT',
      breed: 'Street-cat',
      temparament: ['Introvert', 'Very Bad'],
      dp: 'dpsrc3',
      posts: ['src9', 'src10'],
      followers: ['petId1', 'petId2'],
      following: ['petId2', 'petId4']
    }
  ];

  constructor() {
    this.selectedPet = this.pets[0];
    this.selectedPetName = this.selectedPet.name;
  }
  ngOnInit() {
  }
  onSegmentChange() {
    //@ts-ignore
    this.selectedPet = this.pets.filter((pet, index: number, pets: Array) => {
      if (pet.name === this.selectedPetName)
        return true;
    });
    this.selectedPet = this.selectedPet[0];
  }
}
