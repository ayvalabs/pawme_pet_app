import { BreedData } from '../types';

export const BREED_DATA: Record<string, BreedData> = {
  'Golden Retriever': {
    communication: "Expressive tail wags and big 'puppy dog' eyes! They love leaning against you for warm snuggles and soft boops.",
    training: "Loves snacks and praises! They're super smart and want to make you smile with every trick they learn.",
    healthIssues: ["Hip Dysplasia", "Happy Heart Needs", "Skin Tickles", "Gummy Health"],
    healthTips: "Keep those fluffy ears clean and give them lots of belly rubs to keep their spirits high and happy!",
    recipe: "Yummy slow-cooked chicken with sweet pumpkin stars and a dash of love.",
    walks: "1.5 - 2 hours of fun adventure! Loves chasing butterflies and splashing in puddles.",
    season: "Spring flowers & Autumn leaves are perfect. Keep them cozy in winter and cool with popsicles in summer!",
    cameraTip: "Place your camera where they nap to see their cute little dream-twitches!"
  },
  'Labrador Retriever': {
    communication: "Enthusiastic tail wagging and happy barks! They'll bring you their favorite toy to show love.",
    training: "Food-motivated and eager to please! Positive reinforcement works wonders with these smart pups.",
    healthIssues: ["Hip Dysplasia", "Elbow Dysplasia", "Obesity", "Eye Conditions"],
    healthTips: "Watch their diet carefully - Labs love to eat! Regular exercise keeps them fit and happy.",
    recipe: "Lean turkey with brown rice and green beans - a balanced meal for active pups.",
    walks: "2 hours of active play! Swimming is their absolute favorite activity.",
    season: "They love all seasons but thrive in moderate weather. Keep them cool in summer heat.",
    cameraTip: "Set up near their food bowl - you'll catch some hilarious mealtime moments!"
  },
  'German Shepherd': {
    communication: "Alert ears and focused eyes. They communicate through body posture and protective barks.",
    training: "Highly intelligent and trainable! They need mental stimulation along with physical exercise.",
    healthIssues: ["Hip Dysplasia", "Degenerative Myelopathy", "Bloat", "Allergies"],
    healthTips: "Regular vet checkups for joint health. Keep their minds active with puzzle toys.",
    recipe: "High-protein lamb with sweet potato and spinach for muscle maintenance.",
    walks: "2+ hours of structured exercise. They excel at agility and obedience training.",
    season: "Double coat means they handle cold well but need shade and water in summer.",
    cameraTip: "Position camera at entry points - they love guarding the home!"
  },
  'French Bulldog': {
    communication: "Adorable snorts and playful yaps! They're expressive with their bat-like ears.",
    training: "Stubborn but food-motivated. Keep sessions short and fun with lots of treats.",
    healthIssues: ["Breathing Issues", "Skin Allergies", "Spinal Problems", "Heat Sensitivity"],
    healthTips: "Avoid hot weather and strenuous exercise. Keep their facial folds clean and dry.",
    recipe: "Easy-to-digest chicken with pumpkin puree - gentle on sensitive tummies.",
    walks: "30-45 minutes of gentle walks. Indoor play is often preferred.",
    season: "Air-conditioned comfort in summer is a must! They love cozy indoor weather.",
    cameraTip: "Living room camera catches their hilarious lounging positions!"
  },
  'Beagle': {
    communication: "Famous howls and bay sounds! Their nose leads the way in all conversations.",
    training: "Follow-the-nose training works best! Use scent games and food rewards.",
    healthIssues: ["Epilepsy", "Hypothyroidism", "Cherry Eye", "Ear Infections"],
    healthTips: "Check those floppy ears regularly! Keep them mentally stimulated to prevent boredom.",
    recipe: "Rabbit and vegetable stew - satisfies their hunting instincts in a healthy way.",
    walks: "1-2 hours with lots of sniffing time. Secure fencing is essential!",
    season: "Adaptable to most weather. Their coat handles moderate temperatures well.",
    cameraTip: "Backyard camera to watch their adorable nose-to-ground explorations!"
  },
  'Persian Cat': {
    communication: "Sweet, tiny meows and gentle slow-blinks that mean 'I love you.' They are the queens of soft purrs.",
    training: "Very polite! Responds best to gentle whispers and sparkly toys. They love a calm and cozy learning space.",
    healthIssues: ["Kidney Hugs", "Sweet Snores (flat face)", "Sparkle Eye Care"],
    healthTips: "Daily brushing for that majestic floof is a must! It's like a tiny spa day every single morning.",
    recipe: "Fancy steamed white fish with a tiny bit of yummy pumpkin for a happy tummy.",
    walks: "Indoor jungle time! 20 mins of chasing 'the red dot' or feather wands makes them feel like a fierce hunter.",
    season: "Keep their castle at a perfect cozy temperature. They love sunbeams in the afternoon!",
    cameraTip: "Mount your camera near their favorite high-up perch to watch them being graceful and cute."
  },
  'Maine Coon': {
    communication: "Chirps, trills, and gentle meows. They're the gentle giants who love to chat!",
    training: "Dog-like trainability! They can learn tricks and love interactive play sessions.",
    healthIssues: ["Heart Conditions", "Hip Dysplasia", "Spinal Issues"],
    healthTips: "Regular grooming for their luxurious coat. Monitor weight to protect joints.",
    recipe: "Salmon and chicken blend with omega-3s for that magnificent coat.",
    walks: "Active indoor play for 30-45 minutes. Some enjoy leash walks!",
    season: "Their thick coat loves cooler weather. Provide cool spots in summer.",
    cameraTip: "Capture their majestic poses on cat trees and window perches!"
  },
  'Siamese': {
    communication: "Very vocal with distinctive meows! They'll tell you exactly what they want.",
    training: "Highly intelligent and curious. Puzzle feeders and clicker training work great.",
    healthIssues: ["Respiratory Issues", "Dental Problems", "Eye Conditions"],
    healthTips: "Regular dental care is essential. Keep them mentally engaged to prevent anxiety.",
    recipe: "Lean chicken with fish oil supplements for their sleek coat.",
    walks: "Interactive play sessions 2-3 times daily. They love fetch!",
    season: "Prefer warm, cozy environments. Their short coat needs warmth in winter.",
    cameraTip: "They love being the center of attention - any room camera will capture their antics!"
  },
  'British Shorthair': {
    communication: "Quiet and reserved with soft purrs. They show love through presence, not noise.",
    training: "Independent but food-motivated. Patience and treats are key.",
    healthIssues: ["Heart Disease", "Kidney Issues", "Obesity"],
    healthTips: "Watch their weight - they love lounging! Regular play keeps them healthy.",
    recipe: "Portion-controlled turkey with fiber-rich vegetables.",
    walks: "Moderate play sessions. They enjoy interactive toys but also love naps.",
    season: "Adaptable to indoor temperatures. Their plush coat handles most conditions.",
    cameraTip: "Catch their adorable round faces during their many nap sessions!"
  },
  'Ragdoll': {
    communication: "Soft, sweet meows and lots of purring. They go limp when picked up - hence the name!",
    training: "Gentle and eager to please. They respond well to soft voices and patience.",
    healthIssues: ["Heart Disease", "Bladder Stones", "Hairballs"],
    healthTips: "Regular brushing prevents matting. Keep them indoors for safety.",
    recipe: "High-quality fish with pumpkin for digestive health.",
    walks: "Gentle indoor play. They prefer cuddles over intense activity.",
    season: "Indoor cats who love consistent, comfortable temperatures.",
    cameraTip: "Bedroom camera to watch them follow you around like a puppy!"
  }
};

export const getBreedData = (breed: string): BreedData => {
  return BREED_DATA[breed] || BREED_DATA['Golden Retriever'];
};

export const getAllBreeds = (): string[] => {
  return Object.keys(BREED_DATA);
};

export const getDogBreeds = (): string[] => {
  return ['Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'French Bulldog', 'Beagle'];
};

export const getCatBreeds = (): string[] => {
  return ['Persian Cat', 'Maine Coon', 'Siamese', 'British Shorthair', 'Ragdoll'];
};
