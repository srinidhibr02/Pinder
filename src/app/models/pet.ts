export enum PetType {
    "DOG", "CAT","BIRD"
}
export enum DogBreed {
    'Golden Retriever',
    'Labrador', 
    'Beagle',
    'German Shepard',
    'Siberian Husky',
    'Great Dane',
    'Doberman',
    'Rottweiler',
    'Pug',
    'Cocker Spaniel',
    'Dachshund'
}
export enum CatBreed{
    'Persian',
    'Bombay',
    'Himalayan',
    'British Shorthair',
    'Egyptian Mau',
    'Maine Coon',
    'Siamese Cat',
    'American Bobtail',
    'Munchkin'
}

//Yet to research
enum BirdBreed{

}

export interface Post {
    image: string,
    likes: Array<string>, //petId
}

export interface Pet{
    petId: string,
    name:string,
    category: string,
    breed: string,
    temparament: Array<string>,
    dp:string,
    posts: Array<Post>, //post id
    followers: Array<string>, //pet id
    following:Array<string> //pet id
}