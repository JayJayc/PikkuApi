const { gql } = require("apollo-server");

const restaurant = gql`
    type AddressComponent {
        long_name: String
        short_name: String
        types: [String]
    }
    type CloseOpenTime {
        day: Int
        hours: Int
        minutes: Int
        nextDate: Float
        time: String
    }
    type Period {
        close: CloseOpenTime
        open: CloseOpenTime
    }
    type OpeningHour {
        open_now: Boolean
        periods: [Period]
        weekday_text: [String]
    }
    type PlusCode {
        compound_code: String
        global_code: String
    }
    type Review {
        author_name: String
        author_url: String
        language: String
        profile_photo_url: String
        rating: Int
        relative_time_description: String
        text: String
        time: Float
    }
    type Restaurant {
        address_components: [AddressComponent]
        adr_address: String
        business_status: String
        formatted_address: String
        formatted_phone_number: String
        html_attributions: [String]
        icon: String
        id: String
        international_phone_number: String
        name: String
        opening_hours: OpeningHour
        photos: [String]
        place_id: String
        plus_code: PlusCode
        price_level: Int
        rating: Float
        reference: String
        reviews: [Review]
        scope: String
        types: [String]
        url: String
        user_ratings_total: Int
        utc_offset: Int
        utc_offset_minutes: Int
        vicinity: String
        website: String
        votes: Int
    }
    input AddressComponentInput {
        long_name: String
        short_name: String
        types: [String]
    }
    input CloseOpenTimeInput {
        day: Int
        hours: Int
        minutes: Int
        nextDate: Float
        time: String
    }
    input PeriodInput {
        close: CloseOpenTimeInput
        open: CloseOpenTimeInput
    }
    input OpeningHourInput {
        open_now: Boolean
        periods: [PeriodInput]
        weekday_text: [String]
    }
    input PlusCodeInput {
        compound_code: String
        global_code: String
    }
    input ReviewInput {
        author_name: String
        author_url: String
        language: String
        profile_photo_url: String
        rating: Int
        relative_time_description: String
        text: String
        time: Float
    }
    input RestaurantInput {
        address_components: [AddressComponentInput]
        adr_address: String
        business_status: String
        formatted_address: String
        formatted_phone_number: String
        html_attributions: [String]
        icon: String
        id: String
        international_phone_number: String
        name: String
        opening_hours: OpeningHourInput
        photos: [String]
        place_id: String
        plus_code: PlusCodeInput
        price_level: Int
        rating: Float
        reference: String
        reviews: [ReviewInput]
        scope: String
        types: [String]
        url: String
        user_ratings_total: Int
        utc_offset: Int
        utc_offset_minutes: Int
        vicinity: String
        website: String
        votes: Int
    }
    extend type Mutation {
        addRestaurant(
            roomIdShort: String!
            owner: String!
            restaurant: RestaurantInput!
        ): String
    }
`;
export default restaurant;
