import Email from "../model/email.js";

export const saveSentEmails = (req, res) => {
  try {
    const newemail = Email(req.body);
    newemail.save();

    res.status(201).send("Email saved successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getEmails = async (req, res) => {
  try {
    let emails;
    if (req.params.type === "bin") {
      emails = await Email.find({ bin: true });
    } else if (req.params.type === "allmail") {
      emails = await Email.find({});
    } else if (req.params.type === "starred") {
      emails = await Email.find({ starred: true, bin: false });
    } else {
      emails = await Email.find({ type: req.params.type });
    }
    return res.status(201).send(emails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const moveEmailsToBin = async (req, res) => {
  try {
    await Email.updateMany(
      { _id: { $in: req.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );
    return res.status(201).send("Emails deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const toogleStarredEmails = async (req, res) => {
  try {
    await Email.updateOne(
      { _id: req.body.id },
      { $set: { starred: req.body.value } }
    );
    return res.status(201).send("Email is starred mark");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const deleteEmails = async (req, res) => {
  try {
    await Email.deleteMany({ _id: { $in: req.body } });
    return res.status(201).send("Email delete successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};