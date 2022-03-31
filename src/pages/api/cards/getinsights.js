import Insights from "../../../models/Insights";
import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/dbConnect";
import moment from "moment";
export default async function handler(req, res) {
  const session = await getSession({ req });
  const id = session && session.user.id;

  await dbConnect();
  //find all insights for the id
  const insights = await Insights.findOne({ user: id });
  console.log(insights);

  //instragram
  const instaToday = insights?.instagram.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const instaYesterday = insights?.instagram.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const instaSevenDay = insights?.instagram.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const instaOneMonth = insights?.instagram.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const instaOneYear = insights?.instagram.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  //twitter
  const twitterToday = insights?.twitter.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const twitterYeserday = insights?.twitter.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const twitterSevenDay = insights?.twitter.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const twitterOneMonth = insights?.twitter.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const twitterOneYear = insights?.twitter.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  //facebook

  const facebookToday = insights?.facebook.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const facebookYeserday = insights?.facebook.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const facebookSevenDay = insights?.facebook.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const facebookOneMonth = insights?.facebook.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const facebookOneYear = insights?.facebook.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const linkedinToday = insights?.linkedin.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const linkedinYeserday = insights?.linkedin.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const linkedinSevenDay = insights?.linkedin.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const linkedinOneMonth = insights?.linkedin.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const linkedinOneYear = insights?.linkedin.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const websiteToday = insights?.website.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const websiteYeserday = insights?.website.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const websiteSevenDay = insights?.website.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const websiteOneMonth = insights?.website.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const websiteOneYear = insights?.website.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const locationToday = insights?.location.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const locationYeserday = insights?.location.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const locationSevenDay = insights?.location.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const locationOneMonth = insights?.location.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const locationOneYear = insights?.location.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const vcfToday = insights?.vcf.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const vcfYeserday = insights?.vcf.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const vcfSevenDay = insights?.vcf.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const vcfOneMonth = insights?.vcf.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const vcfOneYear = insights?.vcf.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const documentToday = insights?.document.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const documentYeserday = insights?.document.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const documentSevenDay = insights?.document.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const documentOneMonth = insights?.document.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const documentOneYear = insights?.document.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const googleToday = insights?.google.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const googleYeserday = insights?.google.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const googleSevenDay = insights?.google.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const googleOneMonth = insights?.google.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const googleOneYear = insights?.google.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const emailToday = insights?.email.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const emailYeserday = insights?.email.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const emailSevenDay = insights?.email.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const emailOneMonth = insights?.email.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const emailOneYear = insights?.email.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  const paymentToday = insights?.payment.filter(
    (insight) => insight.createdAt.getDate() === new Date().getDate()
  );
  const paymentYeserday = insights?.payment.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "day"))
  );
  const paymentSevenDay = insights?.payment.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(7, "days"))
  );
  const paymentOneMonth = insights?.payment.filter((insight) =>
    moment(insight.createdAt).isAfter(moment().subtract(1, "month"))
  );
  const paymentOneYear = insights?.payment.filter((insight) =>
    moment(insight.createdAt)?.isAfter(moment().subtract(1, "year"))
  );

  res.status(200).json({
    today: {
      insta: instaToday,
      twitter: twitterToday,
      facebook: facebookToday,
      linkedin: linkedinToday,
      website: websiteToday,
      location: locationToday,
      vcf: vcfToday,
      document: documentToday,
      google: googleToday,
      email: emailToday,
      payment: paymentToday,
    },

    yesterday: {
      insta: instaYesterday,
      twitter: twitterYeserday,
      facebook: facebookYeserday,
      linkedin: linkedinYeserday,
      website: websiteYeserday,
      location: locationYeserday,
      vcf: vcfYeserday,
      document: documentYeserday,
      google: googleYeserday,
      email: emailYeserday,
      payment: paymentYeserday,
    },
    sevenDay: {
      insta: instaSevenDay,
      twitter: twitterSevenDay,
      facebook: facebookSevenDay,
      linkedin: linkedinSevenDay,
      website: websiteSevenDay,
      location: locationSevenDay,
      vcf: vcfSevenDay,
      document: documentSevenDay,
      google: googleSevenDay,
      email: emailSevenDay,
      payment: paymentSevenDay,
    },
    oneMonth: {
      insta: instaOneMonth,
      twitter: twitterOneMonth,
      facebook: facebookOneMonth,
      linkedin: linkedinOneMonth,
      website: websiteOneMonth,
      location: locationOneMonth,
      vcf: vcfOneMonth,
      document: documentOneMonth,
      google: googleOneMonth,
      email: emailOneMonth,
      payment: paymentOneMonth,
    },
    oneYear: {
      insta: instaOneYear,
      twitter: twitterOneYear,
      facebook: facebookOneYear,
      linkedin: linkedinOneYear,
      website: websiteOneYear,
      location: locationOneYear,
      vcf: vcfOneYear,
      document: documentOneYear,
      google: googleOneYear,
      email: emailOneYear,
      payment: paymentOneYear,
    },
    insights: {
      insta: insights?.instagram,
      twitter: insights?.twitter,
      facebook: insights?.facebook,
      linkedin: insights?.linkedin,
      website: insights?.website,
      location: insights?.location,
      vcf: insights?.vcf,
      document: insights?.document,
      google: insights?.google,
      email: insights?.email,
      payment: insights?.payment,
    },
  });
}
