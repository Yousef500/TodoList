import mailchimp from "@mailchimp/mailchimp_marketing";

const handler = async (req, res) => {
    const {email} = req.body;
    if (email) {
        try {
            mailchimp.setConfig({
                apiKey: process.env.MAILCHIMP_API_KEY,
                server: process.env.MAILCHIMP_SERVER_PREFIX
            });

            const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
                email_address: email,
                status: 'pending'
            });

            return res.status(200).json(response)
        } catch (e) {
            console.log({e});
            return res.status(400).json({message: 'Something went wrong'});
        }
    } else {
        res.status(400).json({message: "make sure it is a POST request and there is an email in the body"});
    }
}

export default handler