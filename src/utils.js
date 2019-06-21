import moment from 'moment/moment';

export const emailTemplate = (reservation, place, qrUrl, status, message) =>
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
  '\n' +
  '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">\n' +
  '<head>\n' +
  '<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->\n' +
  '<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>\n' +
  '<meta content="width=device-width" name="viewport"/>\n' +
  '<!--[if !mso]><!-->\n' +
  '<meta content="IE=edge" http-equiv="X-UA-Compatible"/>\n' +
  '<!--<![endif]-->\n' +
  '<title></title>\n' +
  '<!--[if !mso]><!-->\n' +
  '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>\n' +
  '<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>\n' +
  '<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css"/>\n' +
  '<!--<![endif]-->\n' +
  '<style type="text/css">\n' +
  '\t\tbody {\n' +
  '\t\t\tmargin: 0;\n' +
  '\t\t\tpadding: 0;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\ttable,\n' +
  '\t\ttd,\n' +
  '\t\ttr {\n' +
  '\t\t\tvertical-align: top;\n' +
  '\t\t\tborder-collapse: collapse;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t* {\n' +
  '\t\t\tline-height: inherit;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\ta[x-apple-data-detectors=true] {\n' +
  '\t\t\tcolor: inherit !important;\n' +
  '\t\t\ttext-decoration: none !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser table {\n' +
  '\t\t\ttable-layout: fixed;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t[owa] .img-container div,\n' +
  '\t\t[owa] .img-container button {\n' +
  '\t\t\tdisplay: block !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t[owa] .fullwidth button {\n' +
  '\t\t\twidth: 100% !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t[owa] .block-grid .col {\n' +
  '\t\t\tdisplay: table-cell;\n' +
  '\t\t\tfloat: none !important;\n' +
  '\t\t\tvertical-align: top;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid,\n' +
  '\t\t.ie-browser .num12,\n' +
  '\t\t[owa] .num12,\n' +
  '\t\t[owa] .block-grid {\n' +
  '\t\t\twidth: 605px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .mixed-two-up .num4,\n' +
  '\t\t[owa] .mixed-two-up .num4 {\n' +
  '\t\t\twidth: 200px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .mixed-two-up .num8,\n' +
  '\t\t[owa] .mixed-two-up .num8 {\n' +
  '\t\t\twidth: 400px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.two-up .col,\n' +
  '\t\t[owa] .block-grid.two-up .col {\n' +
  '\t\t\twidth: 300px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.three-up .col,\n' +
  '\t\t[owa] .block-grid.three-up .col {\n' +
  '\t\t\twidth: 300px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.four-up .col [owa] .block-grid.four-up .col {\n' +
  '\t\t\twidth: 150px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.five-up .col [owa] .block-grid.five-up .col {\n' +
  '\t\t\twidth: 121px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.six-up .col,\n' +
  '\t\t[owa] .block-grid.six-up .col {\n' +
  '\t\t\twidth: 100px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.seven-up .col,\n' +
  '\t\t[owa] .block-grid.seven-up .col {\n' +
  '\t\t\twidth: 86px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.eight-up .col,\n' +
  '\t\t[owa] .block-grid.eight-up .col {\n' +
  '\t\t\twidth: 75px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.nine-up .col,\n' +
  '\t\t[owa] .block-grid.nine-up .col {\n' +
  '\t\t\twidth: 67px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.ten-up .col,\n' +
  '\t\t[owa] .block-grid.ten-up .col {\n' +
  '\t\t\twidth: 60px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.eleven-up .col,\n' +
  '\t\t[owa] .block-grid.eleven-up .col {\n' +
  '\t\t\twidth: 54px !important;\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t.ie-browser .block-grid.twelve-up .col,\n' +
  '\t\t[owa] .block-grid.twelve-up .col {\n' +
  '\t\t\twidth: 50px !important;\n' +
  '\t\t}\n' +
  '\t</style>\n' +
  '<style id="media-query" type="text/css">\n' +
  '\t\t@media only screen and (min-width: 625px) {\n' +
  '\t\t\t.block-grid {\n' +
  '\t\t\t\twidth: 605px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid .col {\n' +
  '\t\t\t\tvertical-align: top;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid .col.num12 {\n' +
  '\t\t\t\twidth: 605px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.mixed-two-up .col.num3 {\n' +
  '\t\t\t\twidth: 150px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.mixed-two-up .col.num4 {\n' +
  '\t\t\t\twidth: 200px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.mixed-two-up .col.num8 {\n' +
  '\t\t\t\twidth: 400px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.mixed-two-up .col.num9 {\n' +
  '\t\t\t\twidth: 450px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.two-up .col {\n' +
  '\t\t\t\twidth: 302px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.three-up .col {\n' +
  '\t\t\t\twidth: 201px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.four-up .col {\n' +
  '\t\t\t\twidth: 151px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.five-up .col {\n' +
  '\t\t\t\twidth: 121px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.six-up .col {\n' +
  '\t\t\t\twidth: 100px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.seven-up .col {\n' +
  '\t\t\t\twidth: 86px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.eight-up .col {\n' +
  '\t\t\t\twidth: 75px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.nine-up .col {\n' +
  '\t\t\t\twidth: 67px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.ten-up .col {\n' +
  '\t\t\t\twidth: 60px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.eleven-up .col {\n' +
  '\t\t\t\twidth: 55px !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid.twelve-up .col {\n' +
  '\t\t\t\twidth: 50px !important;\n' +
  '\t\t\t}\n' +
  '\t\t}\n' +
  '\n' +
  '\t\t@media (max-width: 625px) {\n' +
  '\n' +
  '\t\t\t.block-grid,\n' +
  '\t\t\t.col {\n' +
  '\t\t\t\tmin-width: 320px !important;\n' +
  '\t\t\t\tmax-width: 100% !important;\n' +
  '\t\t\t\tdisplay: block !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.block-grid {\n' +
  '\t\t\t\twidth: 100% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.col {\n' +
  '\t\t\t\twidth: 100% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.col>div {\n' +
  '\t\t\t\tmargin: 0 auto;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\timg.fullwidth,\n' +
  '\t\t\timg.fullwidthOnMobile {\n' +
  '\t\t\t\tmax-width: 100% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack .col {\n' +
  '\t\t\t\tmin-width: 0 !important;\n' +
  '\t\t\t\tdisplay: table-cell !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack.two-up .col {\n' +
  '\t\t\t\twidth: 50% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack .col.num4 {\n' +
  '\t\t\t\twidth: 33% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack .col.num8 {\n' +
  '\t\t\t\twidth: 66% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack .col.num4 {\n' +
  '\t\t\t\twidth: 33% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack .col.num3 {\n' +
  '\t\t\t\twidth: 25% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack .col.num6 {\n' +
  '\t\t\t\twidth: 50% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.no-stack .col.num9 {\n' +
  '\t\t\t\twidth: 75% !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.video-block {\n' +
  '\t\t\t\tmax-width: none !important;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.mobile_hide {\n' +
  '\t\t\t\tmin-height: 0px;\n' +
  '\t\t\t\tmax-height: 0px;\n' +
  '\t\t\t\tmax-width: 0px;\n' +
  '\t\t\t\tdisplay: none;\n' +
  '\t\t\t\toverflow: hidden;\n' +
  '\t\t\t\tfont-size: 0px;\n' +
  '\t\t\t}\n' +
  '\n' +
  '\t\t\t.desktop_hide {\n' +
  '\t\t\t\tdisplay: block !important;\n' +
  '\t\t\t\tmax-height: none !important;\n' +
  '\t\t\t}\n' +
  '\t\t}\n' +
  '\t</style>\n' +
  '</head>\n' +
  '<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">\n' +
  '<style id="media-query-bodytag" type="text/css">\n' +
  '@media (max-width: 625px) {\n' +
  '  .block-grid {\n' +
  '    min-width: 320px!important;\n' +
  '    max-width: 100%!important;\n' +
  '    width: 100%!important;\n' +
  '    display: block!important;\n' +
  '  }\n' +
  '  .col {\n' +
  '    min-width: 320px!important;\n' +
  '    max-width: 100%!important;\n' +
  '    width: 100%!important;\n' +
  '    display: block!important;\n' +
  '  }\n' +
  '  .col > div {\n' +
  '    margin: 0 auto;\n' +
  '  }\n' +
  '  img.fullwidth {\n' +
  '    max-width: 100%!important;\n' +
  '    height: auto!important;\n' +
  '  }\n' +
  '  img.fullwidthOnMobile {\n' +
  '    max-width: 100%!important;\n' +
  '    height: auto!important;\n' +
  '  }\n' +
  '  .no-stack .col {\n' +
  '    min-width: 0!important;\n' +
  '    display: table-cell!important;\n' +
  '  }\n' +
  '  .no-stack.two-up .col {\n' +
  '    width: 50%!important;\n' +
  '  }\n' +
  '  .no-stack.mixed-two-up .col.num4 {\n' +
  '    width: 33%!important;\n' +
  '  }\n' +
  '  .no-stack.mixed-two-up .col.num8 {\n' +
  '    width: 66%!important;\n' +
  '  }\n' +
  '  .no-stack.three-up .col.num4 {\n' +
  '    width: 33%!important\n' +
  '  }\n' +
  '  .no-stack.four-up .col.num3 {\n' +
  '    width: 25%!important\n' +
  '  }\n' +
  '}\n' +
  '</style>\n' +
  '<!--[if IE]><div class="ie-browser"><![endif]-->\n' +
  '<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">\n' +
  '<tbody>\n' +
  '<tr style="vertical-align: top;" valign="top">\n' +
  '<td style="word-break: break-word; vertical-align: top; border-collapse: collapse;" valign="top">\n' +
  '<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->\n' +
  '<div style="background-color:#f3f3f3;">\n' +
  '<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 605px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">\n' +
  '<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">\n' +
  '<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f3f3;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:605px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->\n' +
  '<!--[if (mso)|(IE)]><td align="center" width="605" style="background-color:transparent;width:605px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->\n' +
  '<div class="col num12" style="min-width: 320px; max-width: 605px; display: table-cell; vertical-align: top;;">\n' +
  '<div style="width:100% !important;">\n' +
  '<!--[if (!mso)&(!IE)]><!-->\n' +
  '<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">\n' +
  '<!--<![endif]-->\n' +
  '<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Georgia, \'Times New Roman\', serif"><![endif]-->\n' +
  '<div style="color:#134C75;font-family:\'Bitter\', Georgia, Times, \'Times New Roman\', serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">\n' +
  '<div style="font-size: 12px; line-height: 14px; font-family: \'Source Sans Pro\', sans-serif; color: #134C75;">\n' +
  `<p style="font-size: 14px; line-height: 16px; margin: 0;"><strong><span style="font-size: 28px; line-height: 33px;">Bună, ${reservation.first_name}!</span></strong><br/></p>\n` +
  '</div>\n' +
  '</div>\n' +
  '<!--[if mso]></td></tr></table><![endif]-->\n' +
  '<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->\n' +
  '<div style="color:#555555;font-family:\'Open Sans\', Helvetica, Arial, sans-serif;line-height:150%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">\n' +
  '<div style="font-size: 12px; line-height: 18px; color: #555555; font-family: \'Open Sans\', Helvetica, Arial, sans-serif;">\n' +
  `<p style="font-size: 14px; line-height: 21px; margin: 0;">
                    Rezervarea ta pentru data de <strong>${moment(reservation.date).format('DD.MM.YYYY')}
                    ora ${reservation.hour} în <span style="font-size: 16px">${place.name}</span>
                    pentru ${reservation.nr_persons} persoane</strong>
                    a fost ${status}.</p>\n` +
  `<p style="font-size: 14px; line-height: 21px; margin: 0;"> 
                    ${message || ''}</p>\n` +
  `<p style="font-size: 14px; line-height: 21px; margin: 0;">
                    ${status === 'confirmată' ? 'O zi frumoasă!' : 'Ne pare rău'}</p>\n` +
  '</div>\n' +
  '</div>\n' +
  '<!--[if mso]></td></tr></table><![endif]-->\n' +
  `<img src="${qrUrl}" style="width: 150px; height: 150px; margin-left: 10px"/>\n` +
  '<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">\n' +
  '<tbody>\n' +
  '<tr style="vertical-align: top;" valign="top">\n' +
  '<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 10px; padding-bottom: 30px; padding-left: 10px; border-collapse: collapse;" valign="top">\n' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #DDDDDD;" valign="top" width="100%">\n' +
  '<tbody>\n' +
  '<tr style="vertical-align: top;" valign="top">\n' +
  '<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" valign="top"><span></span></td>\n' +
  '</tr>\n' +
  '</tbody>\n' +
  '</table>\n' +
  '</td>\n' +
  '</tr>\n' +
  '</tbody>\n' +
  '</table>\n' +
  '<!--[if mso]></td></tr></table><![endif]-->\n' +
  '<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">\n' +
  '<tbody>\n' +
  '<tr style="vertical-align: top;" valign="top">\n' +
  '<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 25px; padding-right: 25px; padding-bottom: 25px; padding-left: 25px; border-collapse: collapse;" valign="top">\n' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent;" valign="top" width="100%">\n' +
  '<tbody>\n' +
  '<tr style="vertical-align: top;" valign="top">\n' +
  '<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;" valign="top"><span></span></td>\n' +
  '</tr>\n' +
  '</tbody>\n' +
  '</table>\n' +
  '</td>\n' +
  '</tr>\n' +
  '</tbody>\n' +
  '</table>\n' +
  '<!--[if (!mso)&(!IE)]><!-->\n' +
  '</div>\n' +
  '<!--<![endif]-->\n' +
  '</div>\n' +
  '</div>\n' +
  '<!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n' +
  '<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n' +
  '</div>\n' +
  '</div>\n' +
  '</div>\n' +
  '<!--[if (IE)]></div><![endif]-->\n' +
  '</body>\n' +
  '</html>';
