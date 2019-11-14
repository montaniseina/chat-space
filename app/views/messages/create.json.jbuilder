json.content @message.content
json.image @message.image_url
json.id @message.user_id
json.created_at @message.created_at.strftime("%Y/%m/%d/(%a) %H:%M:%S");
json.name @message.user.name