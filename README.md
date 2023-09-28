# numberconnversion
LB4 application to convert number to words and words to number


# Postman curl bash calls

curl --location 'http://localhost:3001/to/number' \
--header 'Content-Type: application/json' \
--data '{
    "words": "nine billion five hundred sixty one million five hundred fourteen thousand four hundred fifty nine"
}'

curl --location 'http://localhost:3001/to/words' \
--header 'Content-Type: application/json' \
--data '{
    "number": 9561514459
}'
