# Assumptions
Because the function `getTravelersFlightInfo` doesn't take any arguments for, say, a traveller `id` to specify which traveller you want the flight info for, and `trip` returns an object that contains multiple `travelerIds` for each flight, I assumed the returned `travellers` object should be an array of travllers objects instead of an array of traveller values for one traveller (see Discrepancy in requirements below).

I also assumed that if a traveller on a trip was not on the first flight of the trip, they can be picked up along the away for subsequent flights. For example, a group of travellers can take a flight, then meetup with someone who will join them on their next flight.

# Discrepancy in requirements
I noticed there's a discrepancy between the travelers data structure example in the `README`.md file and the sample output in the `index.js` file. In the `README` the `travelers` property is an array of traveler values for a single travelers while in `index.js` it's an array of traveler objects:

README.md
```
{
  travelers: [
    id,
    name,
    flights: [
      {
        legs: [
          {
            airlineCode,
            airlineName,
            flightNumber,
            frequentFlyerNumber
          }
        ]
      }
    ]
  ]
}
```

index.js
```
// TODO Replace this hard coded response with your code
return {
  travelers: [
    {
      id: 1,
      name: 'Neo',
      flights: [
        {
          legs: [
            {
              airlineCode: 'AA',
              airlineName: 'American',
              flightNumber: 'AA456',
              frequentFlyerNumber: ''
            }
          ]
        },
        {
          legs: [
            {
              airlineCode: 'VA',
              airlineName: 'Virgin',
              flightNumber: 'VA789',
              frequentFlyerNumber: 'NVA123'
            },
            {
              airlineCode: 'AK',
              airlineName: 'Alaskan',
              flightNumber: 'AK789',
              frequentFlyerNumber: 'NAK123'
            }
          ]
        }
      ]
    }
  ]
};
```